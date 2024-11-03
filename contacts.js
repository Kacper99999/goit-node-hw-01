import { nanoid } from "nanoid";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contactsPath = path.join(__dirname, "db", "contacts.json");


export const listContacts = async() => {
    try{
        const data = await fs.readFile(contactsPath, "utf-8");
        console.log(JSON.parse(data));
        return JSON.parse(data);
    }
    catch(error){
        console.error(error);
        return[];
    }
};

export const getContactById = async(id) => {
    try{
        const contacts = await listContacts();
        const contact = contacts.find((con) =>  con.id === id );
        if(contact){
            console.log(contact);
        }
        else{
            console.log("Nie znaleziono kontaku");
        }
    }
    catch(error){
        console.error(error);
    }
};

export const removeContact = async(id) => {
    try{
        const contacts = await listContacts();
        const updatedContacts = contacts.filter((con) => con.id !== id);
        await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
        console.log(`contact o ID ${id} został usunięty`);
    }
    catch(error){
        console.error(error);
    }
};

 export const addContact = async(name, email, phone) => {
    try{
        const contacts = await listContacts();
        const exists = contacts.some((con) => con.email === email || con.phone === phone);
        if(exists){
            console.log("Kontakt już istnieje");
        }
        else{
            const newContact = {
                id:nanoid(),
                name,
                email,
                phone
            };
            contacts.push(newContact);
            await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
            console.log("Nowy kontakt został dodany");
        }
    }
    catch(error){
        console.error(error);
    }
};
