'use strict';

var connection = require('../database/conn');
var response = require('../res');
var modelProduct = require('../models/products');
//CRUD Products
module.exports = {
	
	//CREATE
	insertProducts:function(req,res){
		const {name, description, image, quantity, id_category} = req.body;
		const date = new Date();
		const data={
			name: name,
			description: description,
			image: image,
			quantity: quantity,
			id_category: id_category,
			date_added: date,
			date_updated: date
		}
		modelProduct.insertProduct(data)
		.then(result=>{
			data.id_product = result.id_product
			return response.dataManipulation(res, 201, "Success insert data Product", data)
		})
		.catch(err=>{
			console.log(err)
			return response.dataManipulation(res, 500,"Failed to insert data Product")
		})
	},
	
	
	//READ
	allProducts:(req, res)=>{
		var sortBy = req.query.sortBy || 'id';
		var sort = req.query.sort || 'ASC';
		var search = req.query.search
		
		if((isNaN(Number(req.query.page)) === false && isNaN(Number(req.query.limit)) === false) || !req.query.page || !req.query.limit){
			var limit = Number(req.query.limit) || 10;
			var page = req.query.page || 1;
			var skip = (Number(page)-1) * limit;
		}else{
			res.send("Wrong Value")
		}

		modelProduct.allProduct(search, sortBy, sort, skip, limit)
		.then(result => {
			if(result.length !== 0) return response.getDataResponse(res, 200, result, result.length, page )
			else return response.getDataResponse(res, 404, null, null, null, "Data not Found")
		})
		.catch(err => console.log(err))
	
	},
	
	//READ
	searchProducts:function(req,res){
		const name = req.params.name;
		
		modelProduct.searchProduct(name)
		.then(result=>{
			if(result.length !== 0) return response.ok(result, res)
			else return response.dataManipulation(res, 404,"Data Product Not Found")
		})
		.catch(err=>{
			console.log(err)
			return response.ok(err, res)
		})
	},

	//UPDATE
	updateProduct:(req,res)=>{
		
		 const id_product = req.params.id_product
		 const data = {
			name:req.body.name,
			description: req.body.description,
			image: req.body.image,
			id_category: req.body.id_category,
			quantity: req.body.quantity,
			date_updated: new Date()
		}
		
		modelProduct.updateProduct(id_product, data)
		.then(result => {
			data.id_product = id_product
			if(result.affectedRows !== 0) return response.dataManipulation(res, 200, 'Success updating product', data )
			else return response.dataManipulation(res, 200, "Failed updated", data)
		})
		.catch(err => {
			console.log(err)
			return response.dataManipulation(res, 500,"Internal Server Error")
		})
	},
	
	//DELETE
	deleteProduct: (req, res)=>{
		const id_product = req.params.id_product
		modelProduct.deleteProduct(id_product)
		.then(result =>{
			result.id_product = id_product
			if(result.affectedRows !== 0) return response.dataManipulation(res, 200, "Success deleting data product")
			else return response.dataManipulation(res, 400, "Failed deleted, Data not found")
		})
		.catch(err =>{
			console.log(err)
			return response.dataManipulation(res, 500, err)
		})
	},

	// ADD or REDUCE
	AddandReduceProduct:(req, res)=>{
		const id_product = req.params.id_product
		const act = req.query.act;
		const value = req.query.value || 1;
		const date = new Date();

		modelProduct.AddandReduceProduct(act, value, date, id_product)
		.then(result => {
			
			if(result.affectedRows !== 0) {
				result.id_category = id_product
				res.status(200).json({
					status:200,
					message: "Succes to " + act + " " + value +" product",
					
				})
			}
			else {response.dataManipulation(res, 400, "Cannot "+ act +" product")}
		})
		.catch(err => {
			console.log(err)
			return response.dataManipulation(res, 500,"Internal Server Error")
		})

	}
}
