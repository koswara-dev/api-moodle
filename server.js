require('dotenv').config();

const express = require('express');
const axios = require('axios');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000; // Use PORT from .env or default to 3000

// Token Moodle and API URL
const token = process.env.TOKEN;
const baseApiUrl = process.env.MOODLE_API_URL;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
  
// Endpoint untuk mendapatkan nilai
app.get('/grades', async (req, res) => {
    const courseid = req.query.courseid;

    if (!courseid) {
        return res.status(400).json({ error: 'Parameter courseid diperlukan.' });
    }

    const apiUrl = `${baseApiUrl}?wstoken=${token}&moodlewsrestformat=json&wsfunction=gradereport_user_get_grade_items&courseid=${courseid}`;

    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.usergrades && Array.isArray(data.usergrades)) {
            const result = data.usergrades.map(usergrade => {
                const userid = usergrade.userid || 'N/A';
                const userfullname = usergrade.userfullname || 'N/A';
                const useridnumber = usergrade.useridnumber || 'N/A';

                const gradeitems = usergrade.gradeitems
                    .filter(gradeitem => gradeitem.itemtype === 'course')
                    .map(gradeitem => {
                        const percentage = gradeitem.percentageformatted ? gradeitem.percentageformatted.replace('%', '') : '0';
                        const grade = parseFloat(percentage);
                        const status = grade >= 70 ? "Lulus" : "Belum Lulus";

                        return {
                            userid,
                            userfullname,
                            useridnumber,
                            grade,
                            status
                        };
                    });

                return gradeitems;
            }).flat();

            res.json(result);
        } else {
            res.status(404).json({ error: 'Data tidak ditemukan atau format tidak sesuai.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
    }
});

app.get('/v1/grades', async (req, res) => {
    const courseid = req.query.courseid;
    const useridnumber = req.query.useridnumber;

    if (!courseid) {
        return res.status(400).json({ error: 'Parameter courseid diperlukan.' });
    }

    const apiUrl = `${baseApiUrl}?wstoken=${token}&moodlewsrestformat=json&wsfunction=gradereport_user_get_grade_items&courseid=${courseid}`;

    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.usergrades && Array.isArray(data.usergrades)) {
            let result = data.usergrades.map(usergrade => {
                const userid = usergrade.userid || 'N/A';
                const userfullname = usergrade.userfullname || 'N/A';
                const useridnum = usergrade.useridnumber || 'N/A';

                const gradeitems = usergrade.gradeitems
                    .filter(gradeitem => gradeitem.itemtype === 'course')
                    .map(gradeitem => {
                        const percentage = gradeitem.percentageformatted ? gradeitem.percentageformatted.replace('%', '') : '0';
                        const grade = parseFloat(percentage);
                        const status = grade >= 70 ? "Lulus" : "Belum Lulus";

                        return {
                            userid,
                            userfullname,
                            useridnumber: useridnum,
                            grade,
                            status
                        };
                    });

                return gradeitems;
            }).flat();

            // Filter hasil berdasarkan useridnumber jika disediakan
            if (useridnumber) {
                result = result.filter(item => item.useridnumber === useridnumber);
            }

            if (result.length === 0) {
                return res.status(404).json({ error: 'Data tidak ditemukan untuk user dengan useridnumber tersebut.' });
            }

            res.json(result);
        } else {
            res.status(404).json({ error: 'Data tidak ditemukan atau format tidak sesuai.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
    }
});

// Endpoint untuk mendapatkan attendance
app.get('/attendances', async (req, res) => {
    const courseid = req.query.courseid;

    if (!courseid) {
        return res.status(400).json({ error: 'Parameter courseid diperlukan.' });
    }

    const apiUrl = `${baseApiUrl}?wstoken=${token}&moodlewsrestformat=json&wsfunction=gradereport_user_get_grade_items&courseid=${courseid}`;

    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.usergrades && Array.isArray(data.usergrades)) {
            const result = data.usergrades.map(usergrade => {
                const userid = usergrade.userid || 'N/A';
                const userfullname = usergrade.userfullname || 'N/A';
                const useridnumber = usergrade.useridnumber || 'N/A';

                const gradeitems = usergrade.gradeitems
                    .filter(gradeitem => gradeitem.itemmodule === 'attendance')
                    .map(gradeitem => {
                        const percentage = gradeitem.percentageformatted ? gradeitem.percentageformatted.replace('%', '') : '0';
                        const grade = parseFloat(percentage);
                        const status = grade >= 75 ? "Hadir" : "Tidak Hadir";

                        return {
                            userid,
                            userfullname,
                            useridnumber,
                            grade,
                            status
                        };
                    });

                return gradeitems;
            }).flat();

            res.json(result);
        } else {
            res.status(404).json({ error: 'Data tidak ditemukan atau format tidak sesuai.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
    }
});

app.get('/v1/attendances', async (req, res) => {
    const courseid = req.query.courseid;
    const useridnumber = req.query.useridnumber;

    if (!courseid) {
        return res.status(400).json({ error: 'Parameter courseid diperlukan.' });
    }

    const apiUrl = `${baseApiUrl}?wstoken=${token}&moodlewsrestformat=json&wsfunction=gradereport_user_get_grade_items&courseid=${courseid}`;

    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.usergrades && Array.isArray(data.usergrades)) {
            let result = data.usergrades.map(usergrade => {
                const userid = usergrade.userid || 'N/A';
                const userfullname = usergrade.userfullname || 'N/A';
                const useridnum = usergrade.useridnumber || 'N/A';

                const gradeitems = usergrade.gradeitems
                    .filter(gradeitem => gradeitem.itemmodule === 'attendance')
                    .map(gradeitem => {
                        const percentage = gradeitem.percentageformatted ? gradeitem.percentageformatted.replace('%', '') : '0';
                        const grade = parseFloat(percentage);
                        const status = grade >= 75 ? "Hadir" : "Tidak Hadir";

                        return {
                            userid,
                            userfullname,
                            useridnumber: useridnum,
                            grade,
                            status
                        };
                    });

                return gradeitems;
            }).flat();

            // Filter hasil berdasarkan useridnumber jika disediakan
            if (useridnumber) {
                result = result.filter(item => item.useridnumber === useridnumber);
            }

            if (result.length === 0) {
                return res.status(404).json({ error: 'Data tidak ditemukan untuk user dengan useridnumber tersebut.' });
            }

            res.json(result);
        } else {
            res.status(404).json({ error: 'Data tidak ditemukan atau format tidak sesuai.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
    }
});

app.delete('/v1/delete-attempt', async (req, res) => {
    const userId = req.query.userid;
    
    if (!userId) {
      return res.status(400).send({ error: 'UserID is required' });
    }
  
    try {
      const deleteQuery = 'DELETE FROM dk_quiz_attempts WHERE userid = $1 AND sumgrades < 7';
      await pool.query(deleteQuery, [userId]);
      
      res.status(200).send({ message: `Attempts for user with ID ${userId} and grade < 7 deleted successfully.` });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'An error occurred while deleting quiz attempts.' });
    }
  });

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
