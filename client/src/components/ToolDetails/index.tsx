"use client";
import { useState } from 'react';
import {
  ArrowFlowUpRight24Regular,
  ArrowMove24Regular,
  Cursor24Regular,
  SlideAdd24Regular,
} from '@fluentui/react-icons';
import { Tool } from '@/components/Board';
import { ColorResult, SketchPicker } from 'react-color';
import './styles.css';

interface Props {
  selectedTool: Tool;
  setTaskColor: (arg: string) => void;
	setArrowColor: (arg: string) => void;
};

interface Details {
	title: string;
	description: string;
	picker: boolean;
	setComponentColor: (arg: string) => void;
}

interface ColorPicker {
	opened: boolean;
	color: string;
}

export default function ToolDetails({ selectedTool, setTaskColor, setArrowColor }: Props) {
	const [details, setDetails] = useState<Details>({
		title: 'default',
		description: 'default',
		picker: false,
		setComponentColor: setTaskColor
	});
	switch (selectedTool) {
		case Tool.Pointer:
			setDetails({
				...details,
				title: 'Select',
				description: 'Select an element on the canvas to view and edit its details.'
			});
			break;
		case Tool.Move:
			setDetails({
				...details,
				title: 'Move/Resize',
				description: 'Arrange the position and size of elements on the canvas.'
			});
			break;
		case Tool.Task:
			setDetails({
				...details,
				title: 'Add Task',
				description: 'Add a task element of the specified color to the canvas.',
				picker: true
			});
			break;
		case Tool.Arrow:
			setDetails({
				title: 'Add Arrow',
				description: 'Add an arrow element of the specified color to the canvas.',
				picker: true,
				setComponentColor: setArrowColor
			});
			break;
	}
  const [colorPicker, setColorPicker] = useState<ColorPicker>({
		opened: false,
		color: '#bbb'
	});
	const changeColors = (color: ColorResult) => {
		details.setComponentColor(color.hex);
		setColorPicker({...colorPicker, color: color.hex});
	}
	return (
		<div className="flex flex-col panel-surface-050">
			<div className='titleRow'>
				{selectedTool === Tool.Pointer && <Cursor24Regular/>}
				{selectedTool === Tool.Move && <ArrowMove24Regular/>}
				{selectedTool === Tool.Task && <SlideAdd24Regular/>}
				{selectedTool === Tool.Arrow && <ArrowFlowUpRight24Regular/>}
				<div className='title'>{details.title}</div>
			</div>
			<div className='description'>{details.description}</div>
			{details.picker && 
				<div className='colorRow'>
					<div className='description'>Color: </div>
					<div 
						style={{backgroundColor: colorPicker.color}}
						className='colorPreview'
						onClick={() => setColorPicker({...colorPicker, opened: true})}>
					</div>
				</div>}
			{colorPicker.opened && 
				<div className='popup'>
					<div 
						className='overlay'
						onClick={() => setColorPicker({...colorPicker, opened: false})}>
					</div>
					<SketchPicker color={colorPicker.color} onChangeComplete={changeColors}/>
				</div>}
		</div>
		// reference: https://casesandberg.github.io/react-color/
	)
}