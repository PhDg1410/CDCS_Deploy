import Doc from '../models/Doc.js'
import { SuccessResponse, Created } from '../core/success.response.js';
import { handleErrorResponse } from "../helper/handleErrorResponse.js";
import makePDF from '../helper/MDHelper.js';
import { BadRequest, NotFound, Unauthorized, Forbidden, InternalServerError } from '../core/error.response.js';

//done
let docController = {
	hello: (req,res) => {
		new SuccessResponse({message: "Hello from docController",req})
		return res.status(200).send("hello from docController")
	},
// done
	listDocument: async (req, res) => {
		try{
			let listDocs = await Doc.find({})
			new SuccessResponse({ message: "Get all documents successfully", req });
            return res.status(200).json(listDocs);
		}catch(error){
			return handleErrorResponse(error, req, res);
		}
	},
//done
	addDocument: async (req, res) => {
		console.log(req.body)
		const markdown_content  = req.body.markdown_content;
		const docName = req.body.name
		try{
			if(markdown_content && docName){
				let isSuccess = await makePDF(markdown_content,docName)
				if(isSuccess){
					let newDoc = new Doc({docName})
					await newDoc.save()
					new Created({message: "Document created successfully",req})
					res.status(201).json(newDoc)
				} else {
					console.log("error")
					throw new InternalServerError({  message: error.message, req}).send(res)
				}
			}
			else {
				throw new BadRequest({ message: 'All fields are required', req }, 'info');
			}
		} catch(error){
			return handleErrorResponse(error, req, res);
		}
		
		},

		deleteDocumentById: async (req,res) => {
			try{
				const docId = req.params.id
				await Doc.findByIdAndDelete(docId)
				return new SuccessResponse({ message: "Document deleted successfully", req }).send(res);
			}catch(error){
				return handleErrorResponse(error, req, res);
			}
		}
		// return res.status(401).send(response('Missing required parameters!'));
	}

export default docController;