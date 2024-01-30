import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';

const CryptoElementsContext = createContext(null);

export const CryptoElements = ({ stripeOnramp, children }) => {
  const [ctx, setContext] = useState(() => ({
    onramp: null
  }));

  useEffect(() => {
    let isMounted = true;

    const initializeOnramp = async () => {
      try {
        const onramp = await stripeOnramp;
        if (onramp && isMounted) {
          setContext((ctx) => (ctx.onramp ? ctx : { onramp }));
        }
      } catch (error) {
        console.error('Failed to initialize onramp:', error);
      }
    };

    initializeOnramp(); // Call the function to initialize onramp

    return () => {
      isMounted = false;
    };
  }, [stripeOnramp]);

  return (
    <CryptoElementsContext.Provider value={ctx}>
      {children}
    </CryptoElementsContext.Provider>
  );
};

export const useStripeOnramp = () => {
  const context = useContext(CryptoElementsContext);
  if (!context) {
    throw new Error(
      'useStripeOnramp must be used within a CryptoElements provider.'
    );
  }
  return context.onramp;
};

export const OnrampElement = ({ clientSecret, appearance, ...props }) => {
  const stripeOnramp = useStripeOnramp();
  const onrampElementRef = useRef(null);

  useEffect(() => {
    const containerRef = onrampElementRef.current;

    const mountOnramp = async () => {
      if (clientSecret && stripeOnramp && containerRef) {
        try {
          const session = await stripeOnramp.createSession({
            clientSecret,
            appearance
          });
          session.mount(containerRef);
        } catch (error) {
          console.error('Failed to mount onramp session:', error);
        }
      }
    };

    mountOnramp();

    return () => {
      if (containerRef) {
        containerRef.innerHTML = '';
      }
    };
  }, [clientSecret, stripeOnramp]);

  return <div {...props} ref={onrampElementRef}></div>;
};
