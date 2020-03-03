import React, { useContext, useState, useEffect } from 'react';
import { MainActionContext } from '../../contexts/Main/index';
import useAxios, { REQUEST } from '../../hooks/useAxios';
import { Product } from '../../apis/product/types';
import { getProducts } from '../../apis/product';
import { SET_PRODUCT } from '../../contexts/Main/action';
import { S1001 } from '../../apis/product/code';

function Button({ children }: { children: string }) {
  const mainAction = useContext(MainActionContext);
  const [product, setProduct] = useState<Product>({ hello: '' });

  const handlerGetProducts = (responseData: Product) => ({
    200: {
      default: () => {
        setProduct(responseData);
      },
      // if custom response code exists
      [S1001]: () => {
        setProduct(responseData);
      }
    }
  });
  const requestProduct = useAxios<Product>(getProducts, handlerGetProducts);

  useEffect(() => {
    if (product.hello !== '') {
      // tslint:disable-next-line: no-console
      console.log('set context state', product);
      mainAction({ type: SET_PRODUCT, draftValue: product });
    }
    // tslint:disable-next-line: align
  }, [product]);

  function handleButtonOnClick() {
    requestProduct({ type: REQUEST });
  }

  return <button onClick={handleButtonOnClick}>{children}</button>;
}

export default Button;
