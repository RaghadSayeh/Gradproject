export interface User {
    email: string ;
    password: string;
    firstname: string ;
    lastname: string ;
    interests : string [];
    following : number ;
    followers : number ;
    RegEvents : string [];
    MyEvents : string[];
    private : boolean ;
    address : string ;
    photo : URL ;
    notifications : string[] ;
    followersArray : string[] ;
    followingArray : string[] ;
    todos: string [];
    ownEvents : string[];
}