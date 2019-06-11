const axios = require('axios');
const CityModel = require('../../models/City');
const DistrictModel = require('../../models/District');
var sleep = require('sleep');
module.exports = {
    getAll: (req, res, next) => {
        axios.get('https://thongtindoanhnghiep.co/api/city')
        .then(response => {
        //   console.log(response.data.url);
        //   console.log(response.data.explanation);

        if(response.data.LtsItem){
            for (let index = 0; index < response.data.LtsItem.length; index++) {
                const element = response.data.LtsItem[index];
                const newCity = new CityModel({
                    name: element.Title,
                    id: element.ID,
                });
                newCity.save();
            }
        }
        })
        .catch(error => {
          console.log(error);
        });
    },
    crawlDistrict: (req, res, next) => {
        let listUrl = [];
        CityModel.find({
        })
        .exec()
        .then(citis => {
            citis.forEach(element => {
                let url = `https://thongtindoanhnghiep.co/api/city/${element.id}/district`;
                listUrl.push(url);
            });

            listUrl.forEach(element => {
                sleep.msleep(100);
                axios.get(element)
                .then(response => {
                    for (let index = 0; index < response.data.length; index++) {
                        const element = response.data[index];
                        const newDistrict = new DistrictModel({
                            name: element.Title,
                            id: element.ID,
                            cityId: element.TinhThanhID,
                            cityName: element.TinhThanhTitle
                        });
                        newDistrict.save();
                    }
                })
                .catch(error => {
                  console.log(error);
                });
            });
        })
        .catch(error => {
            res.send(error);
            next()
        });
    },
    getLocationData: (req, res, next) => {
        DistrictModel.find({})
        .exec()
        .then(districts => {
            res.send({ success: true, data: districts });
            next()
        })
        .catch(error => {
            res.send(error);
            next()
        })
    }
}

