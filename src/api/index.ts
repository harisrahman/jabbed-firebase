import { PatientType } from "../Types";
import firebaseDb from "../firebase";
import firebase from "firebase";
import { snapshotToArray } from "../helpers";

const collectionName = 'patients';

export const fetchPatients = async <T>(): Promise<T[]> =>
{
	let response: T[] = [];

	await firebaseDb.collection(collectionName).get()
		.then((querySnapshot) =>
		{
			response = snapshotToArray<T>(querySnapshot);
		})
		.catch((error) =>
		{
			alert(error);
		});

	return response;
};

export const observePatients = <T>(callback: (resp: T[]) => void) =>
{
	firebaseDb.collection(collectionName).onSnapshot((snapshot) =>
	{
		callback(snapshotToArray(snapshot));
	});
}

export const createPatient = async (patient: PatientType) =>
{
	const data = { ...patient, createdAt: firebase.firestore.FieldValue.serverTimestamp() };

	return await firebaseDb.collection(collectionName).add(data);
};

export const doesExist = async (docRef: firebase.firestore.DocumentReference): Promise<boolean> =>
{
	let result = false;

	await docRef.get()
		.then((doc) =>
		{
			result = doc.exists;
		})
		.catch((error) =>
		{
			console.log("Error getting document:", error);
		});

	return result;
};



export const updatePatient = async (id: string, patient: PatientType) =>
{
	const docRef = firebaseDb.collection(collectionName).doc(id);

	delete patient._id;

	if (doesExist(docRef))
	{
		return docRef.update(patient)
			.catch((error) =>
			{
				alert(error);
			});
	}
	else
	{
		alert("Patient not found");
	}
};

export const deletePatient = async (id: string) =>
{
	const docRef = firebaseDb.collection(collectionName).doc(id);

	if (await doesExist(docRef))
	{
		return docRef.delete()
			.catch((error) =>
			{
				alert(error);
			});
	}
	else
	{
		alert("Patient not found");
	}
};
