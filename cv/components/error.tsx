const ErrorComponent = ({ message }: { message: string }) => {
    return (
        <div
            className="flex flex-col bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full mt-4 text-sm"
            role="alert"
        >
            <strong className="font-bold">Erreur !</strong>
            <p className="">{message}</p>
        </div>
    );
};

export default ErrorComponent;
