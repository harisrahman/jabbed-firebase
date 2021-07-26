import { PatientType } from "../Types";
import firebaseDb from "../firebase";
import firebase from "firebase";
import { snapshotToArray } from "../helpers";

const collectionName = 'patients';

export const fetchPatients = async <T>(): Promise<T[]> =>
{
	let response: T[] = [];

	await firebaseDb.child(collectionName).get()
		.then((snapshot) =>
		{
			if (snapshot.exists())
				response = snapshotToArray<T>(snapshot);
		})
		.catch((error) =>
		{
			alert(error);
		});

	return response;
};

export const observePatients = <T>(callback: (resp: T[]) => void) =>
{
	firebaseDb.child(collectionName).on("value", (snapshot) =>
	{
		if (snapshot.val() != null) 	
		{
			callback(snapshotToArray(snapshot));
		}
		else
		{
			callback([]);
		}
	});
}

export const createPatient = async (patient: PatientType) =>
{
	const data = { ...patient, createdAt: firebase.database.ServerValue.TIMESTAMP };

	return await firebaseDb.child(collectionName).push(data);
};

export const doesExist = (pathToChild: string): boolean =>
{
	let result = false;

	firebaseDb.child(pathToChild).once("value", (child) =>
	{
		result = child.exists();
	}).catch(err =>
	{
		console.error(err);
	});

	return result;
};



export const updatePatient = async (id: string, patient: PatientType) =>
{
	const pathToChild = `${collectionName}/${id}`;

	if (doesExist(pathToChild))
	{
		return firebaseDb.child(pathToChild).update(patient)
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
	const pathToChild = `${collectionName}/${id}`;

	if (doesExist(pathToChild))
	{
		return firebaseDb.child(pathToChild).remove()
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
