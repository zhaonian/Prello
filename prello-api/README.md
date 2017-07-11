### API :flushed:<br/>
    List
       - GET           /{username}/list
            - get all lists belonging to the {username}
       - POST          /{username}/list
            - create a new list
       - DELETE        /{username}/list/{listId}
            - delete a list    
       - Patch         /{username}/list/{listId}
            - update a list
    
    Card
       - POST          /{username}/list/{listId}/card
            - add a new card to a list
       - DELETE        /{username}/list/{listId}/card/{cardId}
            - delete a card from a list    
       - Patch         /{username}/list/{listId}/card/{cardId}
            - update a card in a list

    User
       - POST          /user/register
            - create a new user
       - POST          /user/signin
            - check if a user is in db 
