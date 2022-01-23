const { hash } = require("../utils/crypt")

const createAccount = (pool) => {
    return async (username, password, isAdmin) => {
        const query = 'INSERT INTO account (username, password, is_admin) VALUES ($1, $2, $3) RETURNING id'
        const response = await pool.query(query, [username, hash(password), isAdmin])
        
        if (response?.rows?.length <= 0) return null

        return response.rows[0]
    }
}

module.exports = (pool) => {
    return {
        createAccount: createAccount(pool),
    }
}
