// interface Events {
// 	event:[object, object];
// 	event2: [];
// 	event3:[number,string, Map<any, any>] 
// }

class EventBus<Events extends string> {
	private readonly listeners: Record<string,
		Array<(...args: unknown[]) => void>> = {};

	public on(event: Events, callback: (...args: any[]) => void) {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}

		this.listeners[event].push(callback);
	}

	public off(event: Events, callback: () => void) {
		if (!this.listeners[event]) {
			// throw new Error(`Нет события: ${event}`);
			return;
		}

		this.listeners[event] = this.listeners[event].filter(
			(listener) => listener !== callback,
		);
	}

	public emit(event: Events, ...args: unknown[]) {
		if (!this.listeners[event]) {
			// throw new Error(`Нет события: ${event}`);
			return;
		}

		this.listeners[event].forEach((listener) => {
			listener(...args);
		});
	}
}
export default EventBus;
