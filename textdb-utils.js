// Copyright 2020 (c) Peter Širka <petersirka@gmail.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

/**
 * @module Utils
 * @version 1.0.0
 */

exports.sort = function(builder, item) {
	var length = builder.response.length;
	if (length < builder.$take2) {
		length = builder.response.push(item);
		if (length >= builder.$take2) {
			builder.response.sort(builder.$sort);
			builder.$sorted = true;
		}
		return true;
	} else
		return chunkysort(builder, item);
};

exports.sortfinal = function(builder) {
	builder.response.sort(builder.$sort);
};

function chunkysort(builder, item) {

	var beg = 0;
	var length = builder.response.length;
	var tmp = length - 1;

	var sort = builder.$sort(item, builder.response[tmp]);
	if (sort !== -1)
		return;

	tmp = length / 2 >> 0;
	sort = builder.$sort(item, builder.response[tmp]);

	if (sort !== -1)
		beg = tmp + 1;

	for (var i = beg; i < length; i++) {
		var old = builder.response[i];
		var sort = builder.$sort(item, old);
		if (sort !== 1) {
			for (var j = length - 1; j > i; j--)
				builder.response[j] = builder.response[j - 1];
			builder.response[i] = item;
		}
		return true;
	}
}