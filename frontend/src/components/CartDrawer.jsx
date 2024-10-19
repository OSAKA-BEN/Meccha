import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import CartTotal from './cartTotal';
import { X } from 'lucide-react';

const CartDrawer = () => {
  const { products, currency, cartItems, updateQuantity, navigate, isCartOpen, closeCart } = useContext(ShopContext);

  const [ cartData, setCartData ] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const itemId in cartItems) {
        const quantity = cartItems[itemId];
        if (quantity > 0) {
          tempData.push({
            _id: itemId,
            quantity: quantity,
          });
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <Transition.Root show={isCartOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeCart}>
        {/* Background Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        {/* Sliding Panel */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            {/* Panel Content */}
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              {/* Slide-in Animation */}
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                {/* Panel */}
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  {/* Panel Content */}
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    {/* Header */}
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      {/* Close Button */}
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-xl font-medium text-gray-900">Your cart</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-black hover:text-white hover:bg-black border border-gray-300 rounded-md"
                            onClick={closeCart}
                          >
                            <span className="sr-only">Close panel</span>
                            <X className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      {/* Cart Items */}
                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cartData.map((item) => {
                              const productData = products.find((product) => product._id === item._id);
                              return (
                                <li key={item._id} className="flex py-6">
                                  {/* Product Image */}
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={productData.image[0]}
                                      alt={productData.name}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  {/* Product Details */}
                                  <div className="ml-4 flex flex-1 flex-col">
                                    {/* Product Name and Price */}
                                    <div>
                                      <div className="flex justify-between text-sm font-medium text-gray-900">
                                        <h3>{productData.name}</h3>
                                        <p className="ml-4">
                                          {currency}
                                          {productData.price}
                                        </p>
                                      </div>
                                    </div>
                                    {/* Quantity and Delete */}
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex items-center">
                                        <input
                                          onChange={(e) => {
                                            const value = Number(e.target.value);
                                            if (value > 0) {
                                              updateQuantity(item._id, value);
                                            } else {
                                              updateQuantity(item._id, 0);
                                            }
                                          }}
                                          type="number"
                                          min="1"
                                          value={item.quantity}
                                          className="border border-black max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                                        />
                                      </div>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-red-600 hover:text-red-500"
                                          onClick={() => updateQuantity(item._id, 0)}
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <CartTotal />
                      <div className="mt-8">
                        <button
                          onClick={() => {
                            navigate('/place-order');
                            closeCart();
                          }}
                          className="w-full bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
                        >
                          PROCEED TO CHECKOUT
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              {/* End Slide-in Animation */}
            </div>
            {/* End Panel Content */}
          </div>
        </div>
        {/* End Sliding Panel */}
      </Dialog>
    </Transition.Root>
  );
};

export default CartDrawer;
