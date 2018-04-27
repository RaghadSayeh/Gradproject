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
    private : string ;
    address : string ;
    photo : URL ;
    followersArray : string[] ;
    followingArray : string[] ;
}