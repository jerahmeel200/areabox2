export default function SecondaryFooter() {
  return (
    <>
      <div className="footer">
        <img
          src="static/img/Aretha.png"
          style={{ width: '22px', height: '22px', margin: 'auto 15px' }}
        />
        <span>
          © Copyright {new Date().getFullYear()} AreaBox Co. Inc. All rights
          reserved.
        </span>
      </div>
      <style jsx>
        {`
          .footer {
            width: 100vw;
            max-width: 768px;
            min-width: 360px;
            height: 24px;
            background: #8e6db91a;
            font-size: 8px;
            font-family: BarlowRegular;
            position: fixed;
            bottom: 0px;
          }
        `}
      </style>
    </>
  );
}
