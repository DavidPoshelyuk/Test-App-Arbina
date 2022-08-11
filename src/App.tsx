import React, {ChangeEvent, useCallback, useEffect, useMemo, useState} from 'react'
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import "@blueprintjs/core/lib/css/blueprint.css";
import {DateInput} from "@blueprintjs/datetime";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
import {useDispatch, useSelector} from "react-redux";
import {searchActionUserAC, searchNameUserAC, timeOfActionUserAC, TypeState} from "./store/reducers/filter-Reducer";
import {AppRootStateType} from "./store/store";
import moment from "moment";


type TypeItemData = {
	username: string,
	action: string,
	action_createad_at: string
}
const data: TypeItemData[] = [
	{
		"username": "user-001",
		"action": "logged_in",
		"action_createad_at": "2022-05-08T07:01:09.171245Z"
	}, {
		"username": "user-001",
		"action": "button_sign_in_tapped",
		"action_createad_at": "2022-05-08T07:02:09.171245Z"
	},
	{
		"username": "user-001",
		"action": "button_log_out_tapped",
		"action_createad_at": "2022-05-08T07:03:09.171245Z"
	},
]


function App() {
	const dispatch = useDispatch()
	const {
		timeOfActionUser,
		searchActionUser,
		searchNameUser
	} = useSelector<AppRootStateType, TypeState>(state => state.filterReducer)

	const [foundUsers, setFoundUsers] = useState<TypeItemData[]>(data);

	const filter = useCallback((dataFilter: TypeItemData[], keyword: string, filterFiled: keyof TypeItemData) => {
		return dataFilter.filter(f => f[filterFiled].toLowerCase().startsWith(keyword.toLowerCase()))
	}, [])

	const handlerSearchName = (e: ChangeEvent<HTMLInputElement>) => {
		const keyword = e.target.value
		dispatch(searchNameUserAC(keyword))
	}
	const handlerSearchAction = (e: ChangeEvent<HTMLInputElement>) => {
		const keyword = e.target.value
		dispatch(searchActionUserAC(keyword))
	}
	const handlerTimeOfAction = (date: Date | null) => {
		dispatch(timeOfActionUserAC(date))
	}


	const handlerClearSearchName = () => {
		dispatch(searchNameUserAC(''))
	}
	const handlerClearSearchAction = () => {
		dispatch(searchActionUserAC(''))
	}
	const handlerClearFilterDate = () => {
		dispatch(timeOfActionUserAC(null))
	}

	function getMomentFormatter() {
		return {
			formatDate: (date: Date) => moment(date).format(),
			parseDate: (str: string) => new Date(str),
			placeholder: 'Filter by date',
			onChange: handlerTimeOfAction,
			value: timeOfActionUser
		}
	}

	useEffect(() => {
		let results = data
		results = filter(results, searchActionUser, 'action')
		results = filter(results, searchNameUser, 'username')
		if (!!timeOfActionUser) {
			results = results.filter(f =>
				new Date(f["action_createad_at"]).toLocaleDateString() === timeOfActionUser.toLocaleDateString())
		}
		setFoundUsers(results)
	}, [filter, timeOfActionUser, searchActionUser, searchNameUser])

	const Item = useMemo(() => {
			return !!foundUsers && foundUsers.map((m) => {
				return (
					<tr key={m.action_createad_at}>
						<td>{m.username}</td>
						<td>{m.action}</td>
						<td>{m.action_createad_at}</td>
					</tr>
				)
			})
		}, [foundUsers]
	)

	return (
		<main>
			<table className="bp4-html-table .modifier">
				<thead>
				<tr>
					<th>
						<p>Name</p>
						<div className="bp4-input-group .modifier">
							<span className="bp4-icon bp4-icon-search"/>
							<input value={searchNameUser}
								   onChange={handlerSearchName}
								   type="text"
								   className="bp4-input"
								   placeholder="Search name users"/>
							{!!searchNameUser &&
                            <button onClick={handlerClearSearchName} type="button"
                                    className="bp4-button bp4-icon-cross .modifier">
                            </button>}
						</div>
					</th>
					<th>
						<p>Action</p>
						<div className="bp4-input-group .modifier">
							<span className="bp4-icon bp4-icon-search"/>
							<input value={searchActionUser}
								   onChange={handlerSearchAction}
								   type="text"
								   className="bp4-input"
								   placeholder="Search action users"/>
							{!!searchActionUser &&
                            <button onClick={handlerClearSearchAction} type="button"
                                    className="bp4-button bp4-icon-cross .modifier">
                            </button>}
						</div>
					</th>
					<th>
						<p>Date</p>
						<DateInput
							{...getMomentFormatter()}
						/>
						{!!timeOfActionUser && <button onClick={handlerClearFilterDate} type="button"
                                                       className="bp4-button bp4-icon-cross .modifier">Clear
                        </button>}
					</th>
				</tr>
				</thead>
				<tbody>
				{Item}
				</tbody>
			</table>
		</main>
	);
}

export default App;


