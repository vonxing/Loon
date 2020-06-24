/*
平安证券签到脚本
在此基础上修改的
https://raw.githubusercontent.com/chavyleung/scripts/master/smzdm/smzdm.js
更新时间: 2020.6.24 11:00

获取Cookie说明：
打开平安证券App后，点击进入签到页面, 如通知成功获取cookie, 则可以使用此签到脚本.
获取Cookie后, 请将Cookie脚本禁用并移除主机名，以免产生不必要的MITM.
脚本将在每天上午9:00执行, 您可以修改执行时间。

[Mitm]
hostname= m.stock.pingan.com

*/
const cookieName = '平安证券'
const cookieKey = 'vx_cookie_pastock'
const cookieVal = $persistentStore.read(cookieKey)

function sign() {
    let url = {
        url: `https://m.stock.pingan.com/restapi/servicecenter/sign`,
        headers: {
            Cookie: cookieVal
        }
    }
    url.headers['Referer'] = 'https://m.stock.pingan.com/static/valueservice/loyaltyProgram/indexv60.html?v=7.3.2.0&WT.mc_id=app-usercenter-intergralpunching&aid=0&sid=0&ouid=ios_jy'
    url.headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 iOS AYLCAPP/7.3.2.0/h2b3b3a9cb8e4b7cbc978dd332b291e4f scheme/anelicaiapp deviceinfo/I|7.3.2.0|NA|h2b3b3a9cb8e4b7cbc978dd332b291e4f'

    $httpClient.get(url, (error, response, data) => {
        let result = JSON.parse(data)
        let title = `${cookieName}`
        // 签到成功
        if (result && result.data && result.status == 1) {
            let subTitle = `签到结果: 成功`
            let detail = `累计: ${result.data.results.markDate}次, 积分: ${result.data.results.score}`
            $notification.post(title, subTitle, detail)
        }
        // 登录失效
        else if (result && result.data && result.status == 0) {
            let subTitle = `签到结果: 失败`
            let detail = `说明: 登录失效, 请重新获取Cookie`
            $notification.post(title, subTitle, detail)
        }
        // 签到失败
        else {
            let subTitle = `签到结果: 失败`
            let detail = `编码: ${result.status}, 说明: ${result.errmsg}`
            $notification.post(title, subTitle, detail)
        }
        console.log(`${cookieName}, data: ${data}`)
    })

    $done({})
}

sign()