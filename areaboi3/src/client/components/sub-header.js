<section className={'sub_header notif'}>
  <div className="unreadNotif">
    <div>
      <span
        className="unreadBolt"
        style={{ marginTop: '2px', marginLeft: '15px' }}>
        <img src="static/img/back-arrow-fat.svg" />
      </span>
    </div>
  </div>
  {/* {registered && */}

  <a style={{ margin: '0 auto' }} className="rooms_btn" title="Rooms">
    Channel Title
  </a>

  {/* {!registered &&

              <Link href="/Rooms" >
                <a style={{ margin: '0 auto' }} className="rooms_btn" title="Rooms">Chat Details</a>
              </Link>


            } */}

  {
    <a title="Rooms" className="rooms_icon">
      <span>
        <img
          className="view_channels"
          src="static/img/ghost-icon.svg"
          width="15px"
          height="15px"
        />
        <span>83</span>
      </span>
      <p className="sub-button">SUB</p>
    </a>
  }

  {/* {false && registered && userName != defaultUserName &&
              <a onClick={this.onLogout} title="Sign out" className="signout" title={"logout " + userName}><span><img src="static/img/nicons/logout-w.svg" /></span></a>
            }


            {false && !registered &&
              <a id="signin" onClick={this.register} title="Sign in" className="signout"><span><img src="static/img/nicons/login-w.svg" /></span></a>
            } */}
</section>;
