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
Object.defineProperty(exports, "__esModule", { value: true });
function modifyWeatherData(response) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield response.json();
        let modifiedData = [];
        for (let i = 0; i < 10; i++) {
            let newObject = Object.assign(Object.assign({}, data.properties.timeseries[i].data.instant.details), { icon_code: data.properties.timeseries[i].data.next_1_hours.summary.symbol_code, time: data.properties.timeseries[i].time });
            modifiedData.push(newObject);
        }
        return { weather: modifiedData };
    });
}
exports.default = modifyWeatherData;
