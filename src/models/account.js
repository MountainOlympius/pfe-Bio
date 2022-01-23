const { hash } = require("../utils/crypt")

const createAccount = (pool) => {
    return async (username, password, isAdmin) => {
        const query = 'INSERT INTO account (username, password, is_admin) VALUES ($1, $2, $3) RETURNING id'
        const response = await pool.query(query, [username, hash(password), isAdmin])
        
        if (response?.rows?.length <= 0) return null

        return response.rows[0]
    }
}

const selectByUsername = (pool) => {
    return async (username) => {
        const query = 'SELECT id, username, password, is_admin FROM account WHERE username = $1'
        const response = await pool.query(query, [username])
        
        if (response?.rows?.length <= 0) return null

        return response.rows[0]
    }
}

module.exports = (pool) => {
    return {
        createAccount: createAccount(pool),
        selectByUsername: selectByUsername(pool)
    }
}
