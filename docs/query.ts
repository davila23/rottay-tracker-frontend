/*  EXAMPLE QUERYS  */

fromStream('users-345')
  .when({
       $init: function() {
        return {
            categories : []
        }
    },
    $any: function(s, e) {
       
        var category = e;
        
        if (s.categories.includes(category))
            return;
        
        s.categories.push(category.body);
    }
  })


  fromStream('$ce-users')
  .when({
      $init: function() {
        return {
            categories : []
        }
    },
    $any: function(s, e) {
       
        var category = e;
        

         if (s.categories.includes(category.body.userDto.userId))
            return;
      
        s.categories.push(category.body.userDto.userId);
    }
  })


/*  GET USERS STREAM */

  fromStream('$ce-users')
  .when({
      $init: function() {
        return {
            categories : []
        }
    },
    $any: function(s, e) {
       
        var category = e;
        
        if (s.categories.includes(category))
            return;
        
        s.categories.push(category.body);
    }
  })