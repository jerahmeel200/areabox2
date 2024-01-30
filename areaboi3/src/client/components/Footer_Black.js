import Link from 'next/link';

const footerBlack = (props) => {
  return (
    <>
      <div className="black-footer">
        <img src="static/img/Aretha.png" />
        {props.cont.map((ind, i) => (
          <Link href={ind.url} key={i}>
            <span className="footer-item">{ind.text.toUpperCase()}</span>
          </Link>
        ))}
      </div>
      <style jsx>{`
        @font-face {
          fontfamily: RobotoMono;
          src: url('static/fonts/Roboto_Mono/RobotoMono-Bold.ttf');
        }

        .black-footer {
          background: black;
          display: flex;
          justify-content: space-around;
          height: 30px;
          align-items: center;
          fontfamily: 'RobotoMono';
          fontweight: 700;
          width: 100vw;
          min-width: 360px;
          max-width: 768px;
          position: sticky;
          bottom: 0px;
          margin: 0 auto;
        }
        .black-footer img {
          width: 22px;
          height: 22px;
        }
        .footer-item {
          background: white;
          //   height: 15px;
          fontsize: 11px;
          padding: 2px;
          text-align: center;
          whitespace: nowrap;
          display: flex;
          align-items: center;
          color: black;
          cursor: pointer;

          &:hover {
            color: #66f6ff;
          }
        }
      `}</style>
    </>
  );
};

export default footerBlack;
