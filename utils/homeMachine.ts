import { assign } from 'xstate';

interface HomeContext {
	forms?: any[];
	error?: Error;
}

type InitialContext = HomeContext & { forms: undefined; error: undefined; };
type ReadyContext = HomeContext & { forms: any[]; error: undefined; };
type LoadingContext = HomeContext & { forms: any[]; error: undefined; };
type SuccessContext = HomeContext & { forms: any[]; error: undefined; };
type FailureContext = HomeContext & { forms: undefined; error: Error };

type InitialState = { value: 'initial'; context: InitialContext };
type ReadyState = { value: 'ready'; context: ReadyContext };
type LoadingState = { value: 'loading'; context: LoadingContext };
type SuccessState = { value: 'success'; context: SuccessContext };
type FailureState = { value: 'failure'; context: FailureContext };

type HomeState =
	| InitialState
	| ReadyState
	| LoadingState
	| SuccessState
	| FailureState;

type HomeEvent = { type: 'FETCH' } | { type: 'RETRY' };

async function fetchForms () {
	const config = useRuntimeConfig();
	const baseUrl = `${config.apiUrl}/Forms`;

	return await fetchWrapper.get(baseUrl);
}

const homeMachine = createMachine<HomeContext, HomeEvent, HomeState>({
	id: 'home',
	initial: 'initial',
	context: {
		forms: undefined,
		error: undefined,
	},
	states: {
		initial: {
			on: {
				FETCH: 'loading',
			},
		},
		ready: {
			on: {
				FETCH: 'loading',
			},
		},
		loading: {
			entry: assign({
				forms: (context, _event) => context.forms || [],
				error: (_context, _event) => undefined,
			}),
			invoke: {
				id: 'getForms',
				src: (_context, _event) => fetchForms(),
				onDone: {
					target: 'success',
					actions: assign({
						forms: (_context, event) => event.data,
					}),
				},
				onError: {
					target: 'failure',
					actions: assign({
						forms: (_context, _event) => undefined,
						error: (_context, event) => event.data,
					}),
				},
			},
		},
		success: {
			after: {
				2500: 'ready',
			},
		},
		failure: {
			on: {
				RETRY: 'loading',
			},
		},
	},
});

export default homeMachine;
