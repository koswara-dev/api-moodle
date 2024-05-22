const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Token Moodle
const token = '61dfa0a4a688928c1a1065921f0910fe';

// Endpoint untuk mendapatkan nilai
app.get('/api/grades', async (req, res) => {
    const courseid = req.query.courseid;

    if (!courseid) {
        return res.status(400).json({ error: 'Parameter courseid diperlukan.' });
    }

    const apiUrl = `https://training.ptdika.com/webservice/rest/server.php?wstoken=${token}&moodlewsrestformat=json&wsfunction=gradereport_user_get_grade_items&courseid=${courseid}`;

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

// Endpoint untuk mendapatkan attendance
app.get('/api/attendances', async (req, res) => {
    const courseid = req.query.courseid;

    if (!courseid) {
        return res.status(400).json({ error: 'Parameter courseid diperlukan.' });
    }

    const apiUrl = `https://training.ptdika.com/webservice/rest/server.php?wstoken=${token}&moodlewsrestformat=json&wsfunction=gradereport_user_get_grade_items&courseid=${courseid}`;

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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
