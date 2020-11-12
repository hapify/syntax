import { ConverterReplacement, SyntaxConverter } from './SyntaxConverter';

export class ShortToLongConverter extends SyntaxConverter {
	protected replacers: ConverterReplacement[] = [
		{ search: /^\?\?$/, replace: 'else' },
		{ search: /^\?$/, replace: 'endif' },
		{ search: /^\?\?/, replace: 'elseif' },
		{ search: /^\?/, replace: 'if' },
		{ search: /^@$/, replace: 'endfor' },
		{ search: /^@/, replace: 'for' },

		{ search: /\*/, replace: ' and ' },
		{ search: /\//, replace: ' and not ' },
		{ search: /\+/, replace: ' or ' },
		{ search: /\-/, replace: ' or not ' },

		{ search: /\&\&/, replace: ' and ' },
		{ search: /\|\|/, replace: ' or ' },
		{ search: /\!/, replace: ' not ' },

		{ search: /\bpr\b/, replace: 'primary' },
		{ search: /\bun\b/, replace: 'unique' },
		{ search: /\blb\b/, replace: 'label' },
		{ search: /\bnu\b/, replace: 'nullable' },
		{ search: /\bml\b/, replace: 'multiple' },
		{ search: /\bem\b/, replace: 'embedded' },
		{ search: /\bse\b/, replace: 'searchable' },
		{ search: /\bso\b/, replace: 'sortable' },
		{ search: /\bhd\b/, replace: 'hidden' },
		{ search: /\bin\b/, replace: 'internal' },
		{ search: /\brs\b/, replace: 'restricted' },
		{ search: /\bos\b/, replace: 'ownership' },

		{ search: /\btSe\b/, replace: 'email' },
		{ search: /\btSp\b/, replace: 'password' },
		{ search: /\btSu\b/, replace: 'url' },
		{ search: /\btSt\b/, replace: 'text' },
		{ search: /\btSr\b/, replace: 'richText' },
		{ search: /\btS\b/, replace: 'string' },
		{ search: /\btNi\b/, replace: 'integer' },
		{ search: /\btNf\b/, replace: 'float' },
		{ search: /\btNt\b/, replace: 'latitude' },
		{ search: /\btNg\b/, replace: 'longitude' },
		{ search: /\btN\b/, replace: 'number' },
		{ search: /\btB\b/, replace: 'boolean' },
		{ search: /\btDd\b/, replace: 'date' },
		{ search: /\btDt\b/, replace: 'time' },
		{ search: /\btD\b/, replace: 'datetime' },
		{ search: /\btE\b/, replace: 'entity' },
		{ search: /\btO\b/, replace: 'object' },
		{ search: /\btFi\b/, replace: 'image' },
		{ search: /\btFv\b/, replace: 'video' },
		{ search: /\btFa\b/, replace: 'audio' },
		{ search: /\btFd\b/, replace: 'document' },
		{ search: /\btF\b/, replace: 'file' },
		{ search: /\bpMHd\b/, replace: 'mainlyHidden' },
		{ search: /\bpMIn\b/, replace: 'mainlyInternal' },
		{ search: /\bpGeo\b/, replace: 'isGeolocated' },
		{ search: /\bpGSe\b/, replace: 'isGeoSearchable' },
		{ search: /\[ad\b/, replace: 'gteAdmin' },
		{ search: /\[ow\b/, replace: 'gteOwner' },
		{ search: /\[au\b/, replace: 'gteAuth' },
		{ search: /\[gs\b/, replace: 'gteGuest' },
		{ search: /\bad]/, replace: 'lteAdmin' },
		{ search: /\bow]/, replace: 'lteOwner' },
		{ search: /\bau]/, replace: 'lteAuth' },
		{ search: /\bgs]/, replace: 'lteGuest' },
		{ search: /\bad\b/, replace: 'admin' },
		{ search: /\bow\b/, replace: 'owner' },
		{ search: /\bau\b/, replace: 'auth' },
		{ search: /\bgs\b/, replace: 'guest' },
		{ search: /\bpOAd\b/, replace: 'onlyAdmin' },
		{ search: /\bpOOw\b/, replace: 'onlyOwner' },
		{ search: /\bpOAu\b/, replace: 'onlyAuth' },
		{ search: /\bpOGs\b/, replace: 'onlyGuest' },
		{ search: /\bpMAd\b/, replace: 'maxAdmin' },
		{ search: /\bpMOw\b/, replace: 'maxOwner' },
		{ search: /\bpMAu\b/, replace: 'maxAuth' },
		{ search: /\bpMGs\b/, replace: 'maxGuest' },
		{ search: /\bpNAd\b/, replace: 'noAdmin' },
		{ search: /\bpNOw\b/, replace: 'noOwner' },
		{ search: /\bpNAu\b/, replace: 'noAuth' },
		{ search: /\bpNGs\b/, replace: 'noGuest' },

		{ search: /\baA$/, replace: 'camel' },
		{ search: /\bAA$/, replace: 'pascal' },
		{ search: /\ba$/, replace: 'lower' },
		{ search: /\bA$/, replace: 'capital' },
		{ search: /\ba-a$/, replace: 'kebab' },
		{ search: /\bA-A$/, replace: 'header' },
		{ search: /\ba_a$/, replace: 'snake' },
		{ search: /\bA_A$/, replace: 'constant' },
		{ search: /\baa$/, replace: 'compact' },
		{ search: /\bR$/, replace: 'raw' },

		{ search: /\bM\b/, replace: 'Model' },
		{ search: /\bF\b/, replace: 'Fields' },
		{ search: /\bD\b/, replace: 'Dependencies' },
		{ search: /\bR\b/, replace: 'ReferencedIn' },
		{ search: /\bP\b/, replace: 'PrimaryField' },
		{ search: /\bA\b/, replace: 'Accesses' },
		{ search: /\bAc\b/, replace: 'CreateAccess' },
		{ search: /\bAr\b/, replace: 'ReadAccess' },
		{ search: /\bAu\b/, replace: 'UpdateAccess' },
		{ search: /\bAd\b/, replace: 'RemoveAccess' },
		{ search: /\bAs\b/, replace: 'SearchAccess' },
		{ search: /\bAn\b/, replace: 'CountAccess' },
	];
}
