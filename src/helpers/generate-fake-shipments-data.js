import { add, fromUnixTime, getUnixTime } from 'date-fns'
import { times } from 'lodash'

import locodes from 'cacodemon/locodes.json'
import shipments from 'cacodemon/shipments.json'
import { modes } from 'cacodemon/types'

const getRandomLocodes = amount => {
  const randomLocodes = []
  times(amount, () => {
    randomLocodes.push(locodes[Math.floor(Math.random() * locodes.length)])
  })
  return randomLocodes
}

const generateFakeShipmentsData = async (
  amount,
  getAddressInfo,
  getLocations
) => {
  const fake = await Promise.all(
    times(amount, async index => {
      const origin = shipments[
        Math.floor(Math.random() * shipments.length)
      ].Origin.trim()
      const destination = shipments[
        Math.floor(Math.random() * shipments.length)
      ].Destination.trim()
      const [originInfo, destinationInfo] = await Promise.all([
        getAddressInfo(origin),
        getAddressInfo(destination)
      ])
      const locodes = getRandomLocodes(Math.floor(Math.random() * 5) + 2)
      await getLocations(locodes)
      const legs = [
        {
          begin: {
            name: originInfo.formatted_address,
            coordinates: originInfo.geometry.location
          },
          end: locodes.pop(),
          eta: getUnixTime(
            add(new Date(), {
              weeks: Math.floor(Math.random() * 2),
              days: Math.floor(Math.random() * 7),
              hours: Math.floor(Math.random() * 24),
              minutes: Math.floor(Math.random() * 60),
              seconds: Math.floor(Math.random() * 60)
            })
          ),
          mode: modes[Math.floor(Math.random() * modes.length)],
          status: 'INACTIVE'
        }
      ]
      times(locodes.length, () =>
        legs.push(
          generateLeg({
            begin: legs[legs.length - 1].end,
            end: locodes.pop(),
            eta: getUnixTime(
              add(fromUnixTime(legs[legs.length - 1].eta), {
                weeks: Math.floor(Math.random() * 2),
                days: Math.floor(Math.random() * 7),
                hours: Math.floor(Math.random() * 24),
                minutes: Math.floor(Math.random() * 60),
                seconds: Math.floor(Math.random() * 60)
              })
            )
          })
        )
      )
      legs.push({
        begin: legs[legs.length - 1].end,
        end: {
          name: destinationInfo.formatted_address,
          coordinates: destinationInfo.geometry.location
        },
        eta: getUnixTime(
          add(fromUnixTime(legs[legs.length - 1].eta), {
            weeks: Math.floor(Math.random() * 2),
            days: Math.floor(Math.random() * 7),
            hours: Math.floor(Math.random() * 24),
            minutes: Math.floor(Math.random() * 60),
            seconds: Math.floor(Math.random() * 60)
          })
        ),
        mode: modes[Math.floor(Math.random() * modes.length)],
        status: 'INACTIVE'
      })
      return {
        id: `${'S000'}${index + 34671}`,
        origin,
        destination,
        legs
      }
    })
  )
  return fake
}

const generateLeg = ({ begin, end, eta }) => ({
  begin,
  end,
  eta,
  mode: modes[Math.floor(Math.random() * modes.length)],
  status: 'INACTIVE'
})

export default generateFakeShipmentsData
