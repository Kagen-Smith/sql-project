import { pool } from './connection';

export const viewAllDepartments = async () => {
    const results = await pool.query(`
        SELECT 
            id AS "ID",
            name AS "Name"
        FROM
            department
    `);
    return results
};

export const addDepartment = async (name: string) => {
    const result = await pool.query(`INSERT INTO department (name) VALUES ($1) RETURNING *`, [name]);
    return result.rows[0];
};

export const deleteDepartment = async (id: number) => {
    const result = await pool.query(`DELETE FROM department WHERE id = $1`, [id]);
};
