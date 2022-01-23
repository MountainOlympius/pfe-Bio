/*  
    This is a script that create new admin account
    usage : node ./script/createAdmin --username <username> --password <password> 

    Note : if a argument is missing it is generated randomly 
*/

const minimist = require('minimist')

const pool = require('../db')
const accountModel = require('../src/models/account')
const { randomStr } = require('../src/utils/generic')

const { createAccount } = accountModel(pool)

const createAdminAccount = async () => {
    const args = minimist(process.argv.splice(2))

    if (!('username' in args) || typeof args.username !== 'string' || args.username === '') {
        args.username = randomStr(15)
    }

    if (!('password' in args) || typeof args.password !== 'string' || args.password === '') {
        args.password = randomStr(10)
    }

    try {
        const { id } = await createAccount(args.username, args.password, true)
        
        console.log('[*] Admin account has been created')
        console.log(`id : ${id}`)
        console.log(`username : ${args.username}`)
        console.log(`password : ${args.password}`)
    } catch (err) {
        console.log(`[ERROR] ${err}` )
    }

    await pool.end()
}

createAdminAccount()