import firebase from "firebase";

export function isValidEmail(email: string)
{
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	return re.test(String(email).toLowerCase());
}

export function hasOnlyNumbers(str: string)
{
	return str.match(/^[0-9]+$/) != null;
}

export function snapshotToArray<T>(snapshot: firebase.database.DataSnapshot)
{
	const returnArr: T[] = [];

	snapshot.forEach((childSnapshot) => 
	{
		const item = childSnapshot.val();
		item._id = childSnapshot.key;

		returnArr.push(item);
	});

	return returnArr;
};