import { ChangeEventHandler } from "react";

export default function EnterContent({ onChange }: { onChange: ChangeEventHandler<HTMLTextAreaElement> }) {
    return <div className="pt-3">
        <textarea onChange={onChange} id="message" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none" placeholder="Write your Article here..."></textarea>
    </div>
}