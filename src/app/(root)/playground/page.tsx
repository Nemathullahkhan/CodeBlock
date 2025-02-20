"use client"

import EditorPanel from "../_components/EditorPanel"
import InputPanel from "../_components/InputPanel"
import OutputPanel from "../_components/OutputPanel"

export default function Page() {
    return (
        <>
            <div className="h-screen overflow-hidden p-4">
                <div className="max-w-[1800px] mx-auto p-4 h-full">
                    <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-4 h-full">
                        <EditorPanel />
                        <div className="lg:flex-col gap-3">
                            <InputPanel />
                            <OutputPanel />
                        </div>
                    </div>
                </div>

            </div>


        </>

    )
}