
import axios from "axios";
import { dictionary } from "../models/dictionary";
import { IBaseService } from "./IBaseService";


export class DictionaryService implements IBaseService{
   async getAll(word: string): Promise<dictionary[]> {
    let response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      let res: dictionary[] = response.data;
      return res;
       
   }
}