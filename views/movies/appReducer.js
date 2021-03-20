//action-json
//type-mandatory
//payload-optional
const appReducer=(state= {movies:[]}, action)=>
{
    switch(action.type)
    {
        case "SET":
            return {...state, movies: action.payload};
        default:
            return state;
    }

}

export default appReducer;