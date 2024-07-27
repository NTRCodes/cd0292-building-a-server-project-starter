"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
// import path from 'path';
const imageUtils_1 = require("./utils/imageUtils");
exports.app = (0, express_1.default)();
const port = 3000;
exports.app.get('/image', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const imageName = 'fjord'; //req.query.imageName as string;
    const width = parseInt(req.query.width, 10);
    const height = parseInt(req.query.height, 10);
    // ... error handling for missing or invalid parameters
    const options = { width, height };
    console.log(imageName, options);
    try {
        const thumbPath = yield (0, imageUtils_1.processImage)(imageName, options);
        res.sendFile(thumbPath, { root: './' });
        // Serve the image from the thumbPath
    }
    catch (error) {
        // Handle errors
        res.status(500).send('Error processing image');
        console.error(error);
    }
}));
exports.app.listen(port, () => console.log(`Server started at http://localhost:${port}`));
