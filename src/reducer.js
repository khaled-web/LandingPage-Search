import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions'

const reducer = (state, action) => {
  switch(action.type){
    //setLoading
    case SET_LOADING:
      return {...state, isLoading:true}
    //setStories
    case SET_STORIES:
      return {...state,isLoading:false, hits:action.payload.hits, nbPages:action.payload.nbPages}
    //removeStory
    case REMOVE_STORY:
      return {...state, hits:state.hits.filter((story)=>story.objectID !== action.payload.id)}
    //handleSearch   
    case HANDLE_SEARCH:
      return {...state, query: action.payload.query, page:0}
    //handlePage
    case HANDLE_PAGE:
      if(action.payload === 'inc'){
        let nextPage = state.page + 1
        if(nextPage>state.nbPages-1){
          nextPage = 0
        }
        return{...state, page:nextPage}
      }
      if(action.payload === 'dec'){
        let prePage = state.page-1
        if(prePage<0 ){
          prePage = state.nbPages-1
        }
        return{...state,page:prePage}
      }
      
    default:
      throw new Error(`no mathching "${action.type}" action type`)
  }
}
export default reducer
