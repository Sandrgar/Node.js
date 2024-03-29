import pgPromise from 'pg-promise'

const db = pgPromise()('postgres://postgres:sanjiro@localhost:5432/postgres')

const setupDb = async () => {
    await db.none(`
    DROP TABLE IF EXISTS planets;
    CREATE TABLE planets(
        id SERIAL NOT NULL PRIMARY KEY,
        name TEXT NOT NULL
    );
    `),
    await db.none(`INSERT INTO planets (name) VALUES ('Earth')`)
    await db.none(`INSERT INTO planets (name) VALUES ('Mars')`)

}
setupDb() 

const getAll = async (req, res) => {
    const planets = await db.any("SELECT * FROM planets")
    res.status(200).json(planets)
}

const getOneById = async (req, res) => {
    const { id } = req.params;
    const planet = await db.one("SELECT * FROM planets WHERE id=$1", id)
    res.status(200).json(planet)
}

const create = async (req, res) => {
    const { name } = req.body;
    await db.none(`INSERT INTO planets (name) VALUES ($1)`, name)
    res.status(201).json({ msg: "the planet was created" })
}

const updateById = async (req, res) => {
    const { id } = req.params
    const { name } = req.body
    await db.none(`UPDATE planets SET name=$2 WHERE id=$1`, [id, name])

    res.status(200).json({ msg: "planet updated" })
}

const deleteById = async (req, res) => {
    const { id } = req.params
    await db.none(`DELETE FROM planets WHERE id=$1`, id)
    res.status(200).json({ msg: "planet deleted" })
}

export {getAll, getOneById, create, deleteById, updateById}
