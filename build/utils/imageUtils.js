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
exports.processImage = exports.thumbsDir = exports.imagesDir = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp")); //image processing
exports.imagesDir = ('./images');
exports.thumbsDir = ('./thumbs');
const processImage = (imageName, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const originalImagePath = path_1.default.join(exports.imagesDir, `${imageName}.jpg`);
        const thumbImagePath = path_1.default.join(exports.thumbsDir, `${imageName}-${options.width}x${options.height}.jpg`);
        if (yield fs_1.promises.access(thumbImagePath).then(() => true).catch(() => false)) {
            return thumbImagePath;
        }
        else {
            const image = yield (0, sharp_1.default)(originalImagePath)
                .resize(options)
                .toFormat('jpg')
                .toBuffer();
            yield fs_1.promises.writeFile(thumbImagePath, image);
            return thumbImagePath;
        }
    }
    catch (error) {
        console.error('Error processing image: ', error);
        throw error;
    }
});
exports.processImage = processImage;
