Ext.BLANK_IMAGE_URL = 'extjs/resources/images/default/s.gif';

Ext.onReady(function() {
	Ext.QuickTips.init();
	
	var dragTree = new Ext.tree.TreePanel({
		title   : 'Drag it to the right panel',
		region  : 'west',
		width   : 300,
		margins : '5 5 5 5',
		root    : {
			text     : 'root',
			expanded : true,
			children : [{
				text  : 'Drag me, please',
				data  : 'Data of the first child',
				leaf  : true,
				_type : 'tab'
			},{
				text  : 'Drag me too',
				data  : 'Other leaf inner data',
				leaf  : true,
				_type : 'tab'
			},{
				text     : 'Form elements',
				expanded : true,
				children : [{
					text     : 'Textfield',
					leaf     : true,
					_type    : 'field',
					_xtype   : 'textfield'
				},{
					text     : 'Checkbox',
					leaf     : true,
					_type    : 'field',
					_xtype   : 'checkbox'
				},{
					text     : 'Combobox',
					leaf     : true,
					_type    : 'field',
					_xtype   : 'combo'
				}]
			}],
		},
		rootVisible : false,
		enableDrag  : true,
		ddGroup     : 'treeDrag',
		bbar        : new Ext.Toolbar({
			items : [{
				xtype   : 'tbbutton',
				text    : 'List tabs',
				handler : function () {
					var msg = '';
					dropPanel.items.each(function () {
						msg = msg + this.title + '<br/>';
						this.items.each(function () {
							msg = msg + '&nbsp;&nbsp;&nbsp;&nbsp;' + this.xtype + '<br/>';
						});
						msg = msg + '---<br/>';
					});
					Ext.Msg.alert('Tabs List', 'List of all tabs:<br/>' + msg);
				}
			}]
		})
	});
	
	var dropPanel = new Ext.TabPanel({
		region      : 'center',
		id          : 'dropTarget',
		title       : 'Drop Target',
		margins     : '5 5 5 0',
		afterRender : function () {
			Ext.Panel.prototype.afterRender.apply(this, arguments);
			this.dropTarget = this.body;
			
			var dd = new Ext.dd.DropTarget(this.dropTarget, {
				ddGroup    : 'treeDrag', //must be the same as for tree
				notifyDrop : function (dd, e, node) {
					return dropHandler(dropPanel, dd, e, node);
				}
			});
		}
	});
	
	new Ext.Viewport({
		layout : 'border',
		items  : [
			dragTree,
			dropPanel
		]
  });
});

function dropHandler(target, dd, e, node) {
	if (node.node.attributes._type == 'tab') {
		//adding tab to the dropPanel
		var tab = target.add({
			title       : node.node.attributes.data,
			xtype       : 'form',
			closable    : true
		});
		target.setActiveTab(tab);
		
		return true;
	}
	else if (node.node.attributes._type == 'field') {
		target.getActiveTab().add({
			xtype : node.node.attributes._xtype,
			name  : 'blabla'
		});
		target.doLayout();
		
		return true;
	}
	
	//by default we return false (dropping disabled)
	return false;
}

/*
function var_dump(x, max, sep, l) {
	l = l || 0;
	max = max || 5;
	sep = sep || ' ';
	if (l > max) { return "[WARNING: Too much recursion]\n"; }

	var	i, r = '', t = typeof x, tab = '';

	if (x === null) { r += "(null)\n"; }
	else if (t == 'object') {
		l++;
		for (i = 0; i < l; i++) { tab += sep; }
		if (x && x.length) { t = 'array'; }
		r += '(' + t + ") :\n";
		for (i in x) {
			try { r += tab + '[' + i + '] : ' + var_dump(x[i], max, sep, (l + 1)); }
			catch(e) { return "[ERROR: " + e + "]\n"; }
		}
	} else {
		if (t == 'string') {
			if (x == '') { x = '(empty)'; }
		}
		r += '(' + t + ') ' + x + "\n";
	}
	return r;
}
*/