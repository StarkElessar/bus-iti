export type ActionResult<T> = {
	data: T;
	isSuccess: boolean;
	message: string;
}

type Data = {
	data: Record<string, string>,
	isQuery?: boolean;
}

export interface InstanceApi {
	post: <T>(url: string, data: Data) => Promise<ActionResult<T>>;
	get: <T>(url: string) => Promise<ActionResult<T>>;
}

export class Api implements InstanceApi {
	private readonly _baseUrl: string;

	constructor() {
		this._baseUrl = import.meta.env.VITE_API_URL;
	}

	public async post<T>(url: string, { data, isQuery }: Data): Promise<ActionResult<T>> {
		const _url = new URL(this._baseUrl + url);

		if (isQuery) {
			for (const key in data) {
				_url.searchParams.set(key, data[key]);
			}
		}

		const response = await fetch(_url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: !isQuery ? JSON.stringify(data) : null
		});

		if (!response.ok) {
			throw response;
		}

		return response.json();
	}

	public async get<T>(url: string): Promise<ActionResult<T>> {
		const response = await fetch(this._baseUrl + url, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		});

		if (!response.ok) {
			throw response;
		}

		return response.json();
	}
}
