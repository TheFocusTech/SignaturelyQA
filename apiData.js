export const API_URL_END_POINTS = {
    'signInEndPoint': '/auth/sign_in',
    'getDocumentsEndPoint': '/grids?type[]=me&type[]=me_and_other&type[]=others&page=1&limit=10&status[]=draft&status[]=awaiting&status[]=completed&status[]=preparing&status[]=declined&status[]=expired&searchTerm=&orderingKey=createdAt&orderingDirection=DESC&showType=all&searchType=documents',
    'deleteDocumentsEndPoint': '/grids/trash',
    'emptyTrash': '/grids/trash/empty',
    'signUpEndPoint': '/auth/sign_up',
}
