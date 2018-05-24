Routes
	1. 	/toDos
		GET (done)
		POST (done)
		
	2.	/toDo
		PUT (done)
		DELETE

_______________________________________________________________________

1. 	/toDos

* * GET * *	
retrieves all open items on toDo list and completed items

Send:

	{'userEmail':'karim@email.com', 
	'Authorization':'token'
	}

Return - if authorisation is ok.

	{'success':true, 
	'msg':'returned all to do items', 
	'data':
		[
			{'id': '1',
			'description': 'Go to shops',
			'completed':'1'},
			
			{'id': '2',
			'description': 'buy beers',
			'completed':'0'},
			
			{'id': '3',
			'description': 'drink beers',
			'completed':'0'},
		]
		}


Return - if authorisation is incorrect:

	{'success':false, 
	'msg':'Incorrect user credentials.', 
	'data':[]}




* * POST * *
Adds a new item to the API and retrieves all open items on toDo (including new item!!!) list + completed items

Send:

	{'userEmail':'karim@email.com', 
	'Authorization':'token',
	'description': 'Go to shops'
	}

Return - if authorisation is ok.

	{'success':true, 
	'msg':'added new item', 
	'data':
		[
			{'id': '1',
			'description': 'Go to shops',
			'completed':'1'},
			
		.........
			
			{'id': '4',
			'description': 'Go to shops',
			'completed':'0'}
		]
		}	


Return - if authorisation is incorrect:

	{'success':false, 
	'msg':'Incorrect user credentials.', 
	'data':[]}


_______________________________________________________________________

2.	/toDo

* * PUT * *

Send:

	{'userEmail':'karim@email.com', 
	'Authorization':'token',
	'completed':'1',
	'description':'new item descripton'
	}


Return - if successfull

	{'success':true,
    'msg':'updated item',
    'data': []
	}
	

Return - if unsuccessfull	

	{'success':false,
    'msg':'failed to update item',
    'data': []
	}
	


* * DELETE * *

Send:

	{'userEmail':'karim@email.com', 
	'Authorization':'token',
	}


Return - if successfull

	{'success':true,
    'msg':'deleted item',
    'data': []
	}
	

Return - if unsuccessfull	

	{'success':false,
    'msg':'failed to delete item',
    'data': []
	}

_______________________________________________________________________