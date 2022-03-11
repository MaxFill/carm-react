export default function ClearPanel() {
    return (
        <div className="border-2 surface-border border-round surface-section flex-auto h-full">
            <div className="p-fluid grid">
                <div className="col-12 md:col-2">
                    <label htmlFor="theme" className="block text-900 font-normal ml-3 mb-2 mt-2 " >Эта страница находится в разработке...</label>
                </div>
            </div>
        </div>
    );
}