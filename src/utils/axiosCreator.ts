import useAxios from "../hooks/useAxios"

/*
const [, requestProduct] = useAxios(getProducts, {
  successHandler: (successCode, responseData) => {
    handlersGetProductSuccess[successCode](responseData);
  },
  errorHandler: (errorCode, responseData) => {
    handlersGetProductError[errorCode](responseData);
  }
});

const [response, requestProduct] = axiosCreator(getProducts, {
  success: handlersGetProductSuccess,
  error: handlersGetProductError
})

const handlersGetProductSuccess = {
		[S1001]: responseData => {
			showPopup(responseData);
		}
  };
  
  
*/

export default function axiosCreator(axiosRequset, { request, success, error }) {
  return useAxios(axiosRequset, {
    requestHandler: () => {
      if( request ) {
        request();
      }
    },
    successHandler: (successCode, responseData) => {
      if( success ) {
        success[successCode](responseData);
      }
    },
    errorHandler: (errorCode, responseData) => {
      if( error ) {
        error[errorCode](responseData);
      }
    }
  })
}

function handlersGetProductSuccess({statusCode, body}) {
  switch(statusCode) 
} 