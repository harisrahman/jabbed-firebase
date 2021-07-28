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

export function snapshotToArray<T>(snapshot: firebase.firestore.QuerySnapshot)
{
	const returnArr: T[] = [];

	snapshot.forEach((doc) => 
	{
		const item = doc.data();
		item._id = doc.id;

		if (item.createdAt instanceof firebase.firestore.Timestamp)
		{
			item.createdAt = item.createdAt.toDate();
		}

		returnArr.push(item as T);
	});

	return returnArr;
};