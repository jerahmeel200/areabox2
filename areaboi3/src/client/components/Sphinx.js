import { useEffect, useState } from 'react';
import { repScore } from '../utils';
import { auth } from '../settings/firebase';
export default function Sphinx({ profile }) {
  const [status, setStatus] = useState();
  const [sphinx, setSphinx] = useState('baby green');

  useEffect(() => {
    repScore.filter((r) => {
      if (
        r.score === profile?.repScore ||
        r.score.toFixed(1) === profile?.repScore
      ) {
        setSphinx(r.sphinx);
        setStatus(r.status.toUpperCase());
      }
    });
  }, []);

  const isCurrentUser = profile?.userName === auth.currentUser.displayName;

  return (
    <>
      {isCurrentUser ? (
        <>
          <img
            src={`static/img/REP_BADGES/${sphinx}.png`}
            style={{ height: '30px', width: '37px' }}
          />
          <p style={{ fontSize: '6px' }}>{status}</p>
          <p style={{ fontSize: '9px' }}>REP: {profile?.repScore}%</p>
        </>
      ) : (
        <>
          <p style={{ fontSize: '9px' }}>REP: {profile?.repScore}%</p>
          <img
            src={`static/img/REP_BADGES/${sphinx}.png`}
            style={{ width: '30px', height: '24px' }}
          />
        </>
      )}
    </>
  );
}
