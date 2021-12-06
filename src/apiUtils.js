export const hydraPageCount = (collection)=>{
  if(!collection['hydra:view']){
      return 1;
  }
  return Number(
      collection['hydra:view']['hydra:last'].match(/page=(\d+)/)[1]
  );
};