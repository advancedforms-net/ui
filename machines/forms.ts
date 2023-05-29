import { assign } from 'xstate';

interface FormsContext {
	forms?: Form[];
	error?: Error;
}

type InitialContext = FormsContext & { forms: undefined; error: undefined; };
type ReadyContext = FormsContext & { forms: Form[]; error: undefined; };
type LoadingContext = FormsContext & { forms: Form[]; error: undefined; };
type SuccessContext = FormsContext & { forms: Form[]; error: undefined; };
type FailureContext = FormsContext & { forms: undefined; error: Error };

type InitialState = { value: 'initial'; context: InitialContext };
type ReadyState = { value: 'ready'; context: ReadyContext };
type LoadingState = { value: 'loading'; context: LoadingContext };
type SuccessState = { value: 'success'; context: SuccessContext };
type FailureState = { value: 'failure'; context: FailureContext };

type FromsState =
	| InitialState
	| ReadyState
	| LoadingState
	| SuccessState
	| FailureState;

type FormsEvent = { type: 'FETCH' } | { type: 'RETRY' };

async function fetchForms () {
	const config = useRuntimeConfig();
	const baseUrl = `${config.public.apiUrl}/Forms`;

	return await fetchWrapper.get(baseUrl);
}

const formsMachine = createMachine<FormsContext, FormsEvent, FromsState>({
	id: 'forms',
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

export default formsMachine;
