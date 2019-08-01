(function() {
    window.hello = 'hello'
    window.RTC = new WebRTCAPI({
        userId: opts.userId,
        userSig: opts.userSig,
        sdkAppId: opts.sdkappid,
        accountType: opts.accountType
    }, function () {
        RTC.enterRoom({
            roomid: opts.roomid * 1,
            privateMapKey: opts.privateMapKey,
            role: "user",
        }, function (info) {
            console.warn("init succ", info)
            gotStream({
                audio:true,
                video:true
            },function(stream){
                RTC.startRTC({
                    stream: stream,
                    role: 'user'
                });
            })
        }, function (error) {
            console.error("init error", error)
        });
    }, function (error) {
        // console.warn("init error", error)
    });
})()