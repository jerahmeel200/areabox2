const AuthContext = React.createContext();
export const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [auth] = useState(getAuth(app));
  const { profiles } = usedb();

  const requestOTP = async (phoneNumber) => {
    if (!phoneNumber) {
      return new Error('Missing Phone number');
    }

    let useVerifier = store.getState().verifier;

    if (!useVerifier) {
      useVerifier = new RecaptchaVerifier(
        'areaboi-capture-field',
        {
          size: 'invisible',
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
          }
        },
        auth
      );
      setVerifier(useVerifier);
    }

    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        useVerifier
      );
      setOtpConfirmation(confirmationResult);
      return true;
    } catch (error) {
      return new Error(error);
    }
  };

  useEffect(() => {
    const auth = getAuth(app);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: 'ACTION_SET_USER', payload: user });
        dispatch({ type: 'ACTION_SET_LOGGED_IN', payload: true });

        // Fetch user profile from Firestore and set it in state
      } else {
        dispatch({ type: 'ACTION_SET_USER', payload: null });
        dispatch({ type: 'ACTION_SET_LOGGED_IN', payload: false });
      }
    });
  }, []);
};
