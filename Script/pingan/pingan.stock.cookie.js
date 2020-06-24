const cookieName = '平安证券'
const cookieKey = 'vx_cookie_pastock'
const cookieVal = $request.headers['Cookie']

if (cookieVal) {
    let cookie = $persistentStore.write(cookieVal, cookieKey)
    if (cookie) {
        let msg = `${cookieName}`
        $notification.post(msg, 'Cookie写入成功', '详见日志')
        console.log(msg)
        console.log(cookieVal)
    }
}

$done({})